from django.http.response import JsonResponse, HttpResponse
from django.views.decorators.http import require_GET, require_POST
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from webpush import send_group_notification, send_user_notification
import json

@require_GET
def home(request):
    return HttpResponse('<h1>Home Page<h1>')

@require_POST
def send_push(request):
    try:
        body = request.body
        data = json.loads(body)

        admins = get_user_model().objects.filter(groups__name='admins')
        if 'head' not in data or 'body' not in data:
            return JsonResponse(status=400, data={"message": "Invalid data format"})

        payload = {'head': data['head'], 'body': data['body']}
        for user in admins:
            send_user_notification(user=user, payload=payload, ttl=3000)

        return JsonResponse(status=200, data=payload)
    except TypeError:
        return JsonResponse(status=500, data={"message": "An error occurred"})