from django.db import models

class Category(models.Model):
    description = models.CharField(max_length=64, unique=True,verbose_name = 'descripción')
    image = models.ImageField(upload_to='CategoryImages', blank=True)
    class Meta:
        verbose_name = 'categoría'

class Plan(models.Model):
    description = models.CharField(max_length=255, unique=True)
    image = models.ImageField(upload_to='PlanImages', blank=False)
    width = models.CharField(max_length=64)
    height = models.CharField(max_length=64)
    class Meta:
        verbose_name = 'plan'

class Coordinadas(models.Model):
    lat = models.CharField(max_length=64)
    lng = models.CharField(max_length=64)
    class Meta:
        verbose_name = 'coordinadas'


class Field(models.Model):
    name = models.CharField(max_length=64)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='fields')

    class Meta:
        verbose_name = 'field'


class Media(models.Model):
    description = models.CharField(max_length=255, unique=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    plan = models.ForeignKey(Plan, on_delete=models.PROTECT)
    coordinadas = models.ForeignKey(Coordinadas, on_delete=models.PROTECT)
    class Meta:
        verbose_name = 'media'

class Media_Field(models.Model):
    media = models.ForeignKey(Media,related_name='media_fields',on_delete=models.CASCADE)
    field = models.ForeignKey(Field, on_delete=models.CASCADE)
    field_value = models.CharField(max_length=128)
    link_media = models.CharField(max_length=255, default='')

    class Meta:
        verbose_name = 'media_field'
        unique_together = ('media', 'field')

class MediaContainer(models.Model):
    father = models.ForeignKey(Media, on_delete=models.CASCADE, related_name='son_containers')
    son = models.ForeignKey(Media, on_delete=models.CASCADE, related_name='father_containers')
    class Meta:
        verbose_name = 'media_container'
        unique_together = ('father', 'son')








