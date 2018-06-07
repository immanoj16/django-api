from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, status, views
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_protect

from . import serializers

User = get_user_model()


class UserRegistrationAPIView(generics.CreateAPIView):
    """
    Endpoint for user registration.
    """

    permission_classes = (permissions.AllowAny, )
    serializer_class = serializers.UserRegistrationSerializer
    queryset = User.objects.all()

    def retrieve(self, request, pk=None):
        if pk == 'i':
            return Response(serializers.UserRegistrationSerializer(request.user, context={'request': request}).data)
        return super(UserRegistrationAPIView, self).retrieve(request, pk)


@csrf_protect
class UserLoginAPIView(views.APIView):
    """
    Endpoint for user login. Returns authentication token on success.
    """

    permission_classes = (permissions.AllowAny, )
    serializer_class = serializers.UserLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileAPIView(generics.RetrieveAPIView):
    """
    Endpoint to retrieve user profile.
    """

    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )
    serializer_class = serializers.UserProfileSerializer

    def get_object(self):
        return self.request.user.userprofile
