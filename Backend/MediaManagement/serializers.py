from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Category, Plan, Coordinadas, Media, Field, MediaContainer, Media_Field
from django.db.models import F
from .Utils import insert_fields,update_son,update_fields,update_plans_coordinadas,insert_inside_father


class FieldSerializer(ModelSerializer):
    class Meta:
        model = Field
        fields = '__all__'


class CategorySerializer(ModelSerializer):
    fields = FieldSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = '__all__'
    
    
        


class PlanSerializer(ModelSerializer):
    class Meta:
        model = Plan
        fields = '__all__'

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "description": instance.description,
            "image": f"http://127.0.0.1:8000/Media/{instance.image}",

        }


class CoordinadasSerializer(ModelSerializer):
    class Meta:
        model = Coordinadas
        fields = '__all__'


class MediaSerializer(ModelSerializer):
    coordinadas = CoordinadasSerializer()

    class Meta:
        model = Media
        fields = '__all__'

    def create(self, validated_data):
        # Acceder a los datos no validados o enviados de más
        extra_data = self.context['request'].data
        print(extra_data)
        # *******Insertar las coordenadas*********
        coordinada_data = validated_data.pop('coordinadas')
        coordinadas = Coordinadas.objects.filter(lat=coordinada_data['lat'], lng=coordinada_data['lng']).first()
        if coordinadas == None:
            coordinadas = Coordinadas.objects.create(**coordinada_data)
        # *******Insertar el Medio*******
        media = Media.objects.create(coordinadas=coordinadas, **validated_data)
        # *******Insertar Campos del Medio*******
        insert_fields(extra_data,media)
        # Insertar Medio padre e hijo si se requiere
        if 'mediaFatherId' in extra_data:
            media_father_id = extra_data['mediaFatherId']
            media_father = Media.objects.filter(id=media_father_id).first()
            MediaContainer.objects.create(father=media_father, son=media)
        #actualizar el plano y las coordenadas al medio hijo si se requiere
        if 'mediaSonId' in extra_data:
            media_father_coordinadas = Coordinadas.objects.filter(id=media.coordinadas.id).first()
            update_son(extra_data, media_father_coordinadas, validated_data, media)
        return media

    def update(self, instance, validated_data):
        extra_data = self.context['request'].data
        #*******Actualizar coordenadas del medio*******
        coordinadas_data = validated_data.pop('coordinadas')
        # si se envia un medio padre en el formulario el medio a actualizar toma las coordenadas del padre
        if 'mediaFatherId' in extra_data:
            insert_inside_father(extra_data,instance)
        #sino actualiza sus coordenadas
        else:
            coordinadas_serializer = CoordinadasSerializer(instance.coordinadas, data=coordinadas_data)
            if coordinadas_serializer.is_valid():
                coordinadas_serializer.save()
        #*******Actualizar los datos del medio*******
        super().update(instance, validated_data)
        # *******Actualizar valores de los Campos del Medio*******
        update_fields(extra_data)
        # actualizar el plano y las coordenadas al medio hijo si se requiere
        if 'mediaSonId' in extra_data:
           media_father_coordinadas = Coordinadas.objects.filter(id=instance.coordinadas.id).first()
           update_son(extra_data,media_father_coordinadas,validated_data,instance)
        # actualizarle el plano y la coordenada a  cada medio hijo que no este en el mismo plano que su padre
        # y viceversa o no tengan las mismas coordenadas
        update_plans_coordinadas(validated_data, instance.coordinadas)
        return instance


class MediaSerializerGet(ModelSerializer):
    coordinadas = CoordinadasSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    plan = PlanSerializer(read_only=True)

    class Meta:
        model = Media
        fields = '__all__'


class Media_FieldSerializer(ModelSerializer):
    class Meta:
        model = Media_Field
        fields = '__all__'


class Media_FieldSerializerGet(ModelSerializer):
    media = MediaSerializerGet(read_only=True)
    field = FieldSerializer(read_only=True)

    class Meta:
        model = Media_Field
        fields = '__all__'


class FieldsAllSerializer(ModelSerializer):
    field = FieldSerializer(read_only=True)

    class Meta:
        model = Media_Field
        fields = ['field', 'link_media', 'field_value']


class MediaContainerSerializer(ModelSerializer):
    class Meta:
        model = MediaContainer
        fields = '__all__'


class MediaContainerFatherSerializer(ModelSerializer):
    coordinadas = CoordinadasSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    plan = PlanSerializer(read_only=True)
    media_fields = FieldsAllSerializer(many=True, read_only=True)

    class Meta:
        model = Media
        fields = '__all__'


class MediaContainerSerializerGet(ModelSerializer):
    father = MediaContainerFatherSerializer(read_only=True)

    class Meta:
        model = MediaContainer
        fields = ['father']


class Media_Fields_AllSerializer(ModelSerializer):
    coordinadas = CoordinadasSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    plan = PlanSerializer(read_only=True)
    father_containers = MediaContainerSerializerGet(many=True, read_only=True)
    media_fields = FieldsAllSerializer(many=True, read_only=True)

    class Meta:
        model = Media
        fields = '__all__'


class MediaContainerSerializerGetSon(ModelSerializer):
    son = MediaContainerFatherSerializer(read_only=True)

    class Meta:
        model = MediaContainer
        fields = ['son']


class Media_Fields_Sons_AllSerializer(ModelSerializer):
    coordinadas = CoordinadasSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    plan = PlanSerializer(read_only=True)
    media_fields = FieldsAllSerializer(many=True, read_only=True)
    son_containers = MediaContainerSerializerGetSon(many=True, read_only=True)

    class Meta:
        model = Media
        fields = '__all__'
