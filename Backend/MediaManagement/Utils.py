from .models import Category, Plan, Coordinadas, Media, Field, MediaContainer, Media_Field
from django.db.models import F
def insert_fields(data,media):
    for key, value in data['fields'].items():
        field = Field.objects.filter(id=key).first()
        Media_Field.objects.create(media=media, field=field, field_value=value['value'], link_media=value['link'])

def update_fields(extra_data):
    for key, value in extra_data['fields'].items():
        media_field = Media_Field.objects.filter(id=value['idMediaField']).first()
        media_field.field_value = value['value']
        media_field.link_media = value['link']
        media_field.save()

def update_son(extra_data, media_father_coordinadas,validated_data,media):
    media_son_id = extra_data['mediaSonId']
    media_son = Media.objects.filter(id=media_son_id).first()
    media_son.coordinadas = media_father_coordinadas
    media_son.plan = validated_data['plan']
    media_son.save()
    MediaContainer.objects.create(father=media, son=media_son)



def update_plans_coordinadas(validated_data, media_father_coordinadas):
    medias_container = MediaContainer.objects.exclude(father__plan=F('son__plan')) | MediaContainer.objects.exclude(father__coordinadas=F('son__coordinadas'))
    while (len(medias_container) != 0):
        media_son = Media.objects.filter(id=medias_container[0].son.id).first()
        media_father = Media.objects.filter(id=medias_container[0].father.id).first()
        print(media_son)
        media_son.plan = validated_data['plan']
        media_son.coordinadas = media_father_coordinadas
        media_son.save()
        media_father.plan = validated_data['plan']
        media_father.save()
        medias_container = MediaContainer.objects.exclude(father__plan=F('son__plan')) | MediaContainer.objects.exclude(father__coordinadas=F('son__coordinadas'))
        print(medias_container)

def insert_inside_father(extra_data, instance):
    # comprobar si el medio ya es hijo de otro medio entonces hay que eliminar la relacion
    media_container = MediaContainer.objects.filter(son=instance.id).first()
    if media_container != None:
        media_container.delete()
    media_father_id = extra_data['mediaFatherId']
    media_father = Media.objects.filter(id=media_father_id).first()
    instance.coordinadas = media_father.coordinadas
    MediaContainer.objects.create(father=media_father, son=instance)
