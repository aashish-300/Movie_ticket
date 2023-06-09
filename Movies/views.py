from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt


from .models import Ticket, Movies

from account.models import MyUser
import json


@csrf_exempt
def seatView(request):
    userId = request.session["userId"]
    user = MyUser.objects.get(id=userId)
    movie = Movies.objects.get(id=request.session["movieId"])
    context = {"user": user, "movie": movie}
    return render(request, "Movies/seatView.html", context=context)


@login_required(login_url="signin")
@csrf_exempt
def ticket_date(request):
    if request.method == "POST":
        try:
            date = json.loads(request.body)["date"]
            print("---------------")
            print(date)
            request.session["movie_date"] = date
            movie_title = request.session["movie_title"]  # movie_date = date
            print(movie_title)
            query_set = Ticket.objects.filter(
                movie_title=movie_title, movie_date=date
            ).values_list(
                "seat_number", flat=True
            )  # no flat=True means it returns list of tuples
            seats = list(query_set)
            seats = " ".join(seats)
            return redirect("seat-view")
        except Exception as e:
            print(e)
            return HttpResponse("<h3>something went wrong</h3>")
    else:
        return HttpResponse("<h3>Invalid request</h3>")


@login_required(login_url="signin")
@csrf_exempt
def book_ticket(request):
    if request.method == "POST":
        print("Booking Ticket")
        data = json.loads(request.body)
        print(data)
        userId = request.session["userId"]
        user = MyUser.objects.get(id=userId)
        Ticket.objects.create(
            user=user,
            movie = Movies.objects.get(id=request.session["movieId"]),
            movie_title=request.session["movie_title"],
            seat_number=" ".join(map(str, data["seatSelectedNumber"])),
            price=data["totalPrice"],
            movie_date=request.session["movie_date"],
        )
        # Increase the rewqrd point of the user by 5
        user.reward_point += 5
        print(user.reward_point)
        user.save()
        print("ticket created successfully")

        return HttpResponse(status=200)  # redirect('seatView')
    return HttpResponse("<h3>Something went wrong!</h3>")


def reserved_seats(request):
    if request.method == "GET":
        try:
            date = request.session["movie_date"]
            title = request.session["movie_title"]
            query_set = Ticket.objects.filter(
                movie_title=title, movie_date=date
            ).values_list(
                "seat_number", flat=True
            )  # no flat=True means it returns list of tuples
            seats = list(query_set)
            seats = " ".join(seats)
            context = {"reserved_seats": seats}
            return JsonResponse(context)
        except Exception as e:
            print(e)
            return HttpResponse("internal server error")
    return HttpResponse("Method not allowed!")


@login_required(login_url="signin")
@csrf_exempt
def buyWithPoint(request):
    if request.method == "POST":
        try:
            userId = request.session["userId"]
            data = json.loads(request.body)
            print(data)
            user = MyUser.objects.get(id=userId)
            Ticket.objects.create(
                user=user,
                movie_title=request.session["movie_title"],
                seat_number=" ".join(map(str, data["seatSelectedNumber"])),
                price=data["totalPrice"],
                movie_date=request.session["movie_date"],
            )
            print("ticket created successfully")
            user.reward_point -= 100
            user.save()
            return redirect("mytickets")
        except Exception as e:
            print(e)
            return HttpResponse("<h3>Something went wrong!</h3>")
    return HttpResponse("Invalid Method!!")

