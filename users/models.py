from django.conf import settings
from django.db import models, transaction
from django.contrib.auth import get_user_model

User = get_user_model()


class UserProfileRegistrationManager(models.Manager):
    """
    Custom manager for ``UserProfile`` model.

    The methods defined here provide shortcuts for user profile creation
    and activation (including generation and emailing of activation
    keys), and for cleaning out expired inactive accounts.
    """

    @transaction.atomic
    def create_user_profile(self, data, is_active=False, site=None):
        """
        Create a new user and its associated ``UserProfile``.
        Also, send user account activation (verification) email.

        """

        password = data.pop('password')
        user = User(**data)
        user.is_active = is_active
        user.set_password(password)
        user.save()

        self.create_profile(user)

        return user

    def create_profile(self, user):
        """
        Create UserProfile for give user.
        Returns created user profile on success.

        """

        self.create(
            user=user
        )


class UserProfile(models.Model):
    """
    A model for user profile that also stores verification key.
    Any methods under User will reside here.

    """

    ACTIVATED = "ALREADY ACTIVATED"

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    objects = UserProfileRegistrationManager()

    class Meta:
        verbose_name = u'user profile'
        verbose_name_plural = u'user profiles'

    def __str__(self):
        return str(self.user)
