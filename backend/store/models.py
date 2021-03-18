from django.db import models
from django.conf import settings
import uuid
from PIL import Image

# Create your models here.
class Product(models.Model):
    P = 'Phones'
    T = 'Tablets/iPad'
    A = 'Accessories'

    CATEGORY = (
        (P, 'Phones'),
        (T, 'Tablets/iPad'),
        (A, 'Accessories'),
    )  

    N = 'Brand new'
    U = 'Used'

    CONDITION = (
        (N, 'Brand new'),
        (U, 'Used'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, verbose_name="product_id")
    category = models.CharField(max_length=30, null=False, choices=CATEGORY, default=CATEGORY[0][0])
    brand = models.CharField(max_length=20, null=True, blank=True)
    name = models.CharField(max_length=100, null=False)
    price = models.DecimalField(max_digits=10, null=True, decimal_places=2)
    condition = models.CharField(max_length=20, null=False, choices=CONDITION, default=CONDITION[0][0])
    description = models.TextField(max_length=200, null=True, blank=True)
    date_posted = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.name
   

def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/product<id>/<filename>
    return 'phone_{0}/{1}'.format(instance.product.id, filename)
class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    image = models.ImageField(upload_to=user_directory_path, null=True, blank=True)

    def save(self):
        super().save()

        img = Image.open(self.image.path)

        if img.width > 500:
            new_img = (500, 500)
            def reorient_image(im):
                try:
                    image_exif = im._getexif()
                    image_orientation = image_exif[274]
                    if image_orientation in (2,'2'):
                        return im.transpose(Image.FLIP_LEFT_RIGHT)
                    elif image_orientation in (3,'3'):
                        return im.transpose(Image.ROTATE_180)
                    elif image_orientation in (4,'4'):
                        return im.transpose(Image.FLIP_TOP_BOTTOM)
                    elif image_orientation in (5,'5'):
                        return im.transpose(Image.ROTATE_90).transpose(Image.FLIP_TOP_BOTTOM)
                    elif image_orientation in (6,'6'):
                        return im.transpose(Image.ROTATE_270)
                    elif image_orientation in (7,'7'):
                        return im.transpose(Image.ROTATE_270).transpose(Image.FLIP_TOP_BOTTOM)
                    elif image_orientation in (8,'8'):
                        return im.transpose(Image.ROTATE_90)
                    else:
                        return im
                except (KeyError, AttributeError, TypeError, IndexError):
                    return im
            rotated_img = reorient_image(img)
            rotated_img.thumbnail(new_img)
            rotated_img.save(self.image.path)

    def __str__(self):
        return (f'{self.product}')



class Customer(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    mobile_number = models.CharField(max_length=15, null=True, blank=True, unique=True)
    first_name = models.CharField(max_length=30, null=True, blank=True)
    last_name = models.CharField(max_length=30, null=True, blank=True)
    complete_address = models.CharField(max_length=100, null=True, blank=True)

    @property
    def au_mobile_number(self):
        return self.user.mobile_number

    @property
    def au_first_name(self):
        return self.user.first_name

    @property
    def au_last_name(self):
        return self.user.last_name

    @property
    def au_complete_address(self):
        return self.user.complete_address

    @property
    def customer_info(self):
        if self.user:
            return (f'{self.au_first_name} {self.au_last_name} ({self.au_mobile_number})')
    
        return (f'{self.first_name} {self.last_name} ({self.mobile_number})')
        

    def __str__(self):
        return self.customer_info