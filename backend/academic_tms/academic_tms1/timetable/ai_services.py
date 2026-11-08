from openai import OpenAI
from django.conf import settings
import json

client = OpenAI(api_key=settings.OPENAI_API_KEY)


def build_context(timetable_data):
    """Convert timetable queryset data into a readable context string."""
    lines = []
    for entry in timetable_data:
        lines.append(
            f"- {entry['day']} {entry['start_time']}-{entry['end_time']}: "
            f"{entry['subject_name']} | Teacher: {entry['teacher_name']} | Room: {entry['room_number']}"
        )
    return "\n".join(lines) if lines else "No timetable entries found."


def detect_conflicts(timetable_entries):
    """
    Use GPT-4 to detect teacher and room conflicts in the timetable.
    Returns a list of conflict descriptions.
    """
    context = build_context(timetable_entries)
    prompt = f"""
You are an academic scheduling assistant. Analyze the following timetable entries and detect:
1. Teacher conflicts (same teacher scheduled in two places at the same time)
2. Room conflicts (same room used by two sessions at the same time)
3. Any other scheduling issues

Timetable:
{context}

Respond ONLY with a JSON object in this format:
{{
  "conflicts": [
    {{"type": "Teacher Conflict", "description": "...", "affected_entries": [...]}},
    ...
  ],
  "summary": "..."
}}
If no conflicts found, return {{"conflicts": [], "summary": "No conflicts detected."}}
"""
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.1,
        response_format={"type": "json_object"}
    )
    return json.loads(response.choices[0].message.content)


def generate_timetable_suggestions(subjects, teachers, rooms, semester_name):
    """
    Use GPT-4 to generate a conflict-free timetable suggestion.
    """
    subjects_info = "\n".join([f"- {s['name']} ({s['code']}): {s['weekly_hours']}h/week, needs {s['room_requirement']}, teacher: {s['teachers']}" for s in subjects])
    teachers_info = "\n".join([f"- {t['name']}: available {t['available_days']}, max {t['max_weekly_hours']}h/week" for t in teachers])
    rooms_info = "\n".join([f"- {r['room_number']} ({r['room_type']}): capacity {r['capacity']}" for r in rooms])

    prompt = f"""
You are an academic scheduling expert. Generate a conflict-free weekly timetable for semester: {semester_name}.

Subjects:
{subjects_info}

Teachers:
{teachers_info}

Rooms:
{rooms_info}

Rules:
- No teacher should have two classes at the same time
- No room should have two classes at the same time
- Respect teacher availability days
- Match room type to subject requirements (Lab subjects need Lab rooms)
- Keep classes between 08:00 and 18:00
- Each session is 1 hour

Respond ONLY with a JSON array in this format:
[
  {{
    "session_title": "...",
    "subject_code": "...",
    "teacher_name": "...",
    "room_number": "...",
    "day": "Monday",
    "start_time": "09:00",
    "end_time": "10:00",
    "session_type": "Lecture"
  }},
  ...
]
"""
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
        response_format={"type": "json_object"}
    )
    content = json.loads(response.choices[0].message.content)
    # GPT may wrap the array in a key
    if isinstance(content, dict):
        for key in content:
            if isinstance(content[key], list):
                return content[key]
    return content


def get_availability_gaps(teachers_data, timetable_data):
    """
    Use GPT-4 to identify teacher availability gaps for extra classes.
    """
    teachers_info = "\n".join([f"- {t['name']}: available {t['available_days']}, max {t['max_weekly_hours']}h/week, currently scheduled {t['scheduled_hours']}h" for t in teachers_data])
    prompt = f"""
Analyze these teachers and identify who has availability gaps that could be used for extra classes or make-up sessions:

{teachers_info}

Respond ONLY with a JSON object:
{{
  "gaps": [
    {{"teacher": "...", "free_hours": ..., "best_days": [...], "suggestion": "..."}},
    ...
  ],
  "summary": "..."
}}
"""
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
        response_format={"type": "json_object"}
    )
    return json.loads(response.choices[0].message.content)


def generate_progress_report(tasks_data, semester_name):
    """
    Use GPT-4 to generate a progress/completion summary.
    """
    tasks_info = "\n".join([f"- [{t['status']}] {t['title']} (Subject: {t['subject']}, Due: {t['due_date']}, Marks: {t['marks_scored']}/{t['max_marks']})" for t in tasks_data])
    prompt = f"""
Generate a concise academic progress report for semester: {semester_name}

Tasks & Assignments:
{tasks_info}

Include:
- Overall completion rate
- Subjects needing attention
- Average marks performance
- Upcoming deadlines to watch

Respond ONLY with a JSON object:
{{
  "completion_rate": "...",
  "average_marks_percent": ...,
  "subjects_needing_attention": [...],
  "upcoming_deadlines": [...],
  "highlights": [...],
  "summary": "..."
}}
"""
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
        response_format={"type": "json_object"}
    )
    return json.loads(response.choices[0].message.content)