from flask import Blueprint, request, jsonify
from app.models import db, Resource
from flask_login import login_required, current_user

resource_routes = Blueprint('resources', __name__)

@resource_routes.route('/<int:topic_id>', methods=['GET'])
def get_resources(topic_id):
    resources = Resource.query.filter(Resource.topic_id == topic_id).all()
    return jsonify([resource.to_dict() for resource in resources])

@resource_routes.route('/<int:topic_id>', methods=['POST'])
@login_required
def create_resource(topic_id):
    data = request.json
    resource = Resource(
        topic_id=topic_id,
        name=data['name'],
        resource_type=data['resource_type'],
        url=data['url']
    )
    db.session.add(resource)
    db.session.commit()
    return jsonify(resource.to_dict()), 201

@resource_routes.route('/<int:resource_id>', methods=['PUT'])
@login_required
def update_resource(resource_id):
    resource = Resource.query.get(resource_id)
    if resource and resource.topic.user_id == current_user.id:
        data = request.json
        resource.name = data['name']
        resource.resource_type = data['resource_type']
        resource.url = data['url']
        db.session.commit()
        return jsonify(resource.to_dict())
    return jsonify({'message': 'Permission denied'}), 403

@resource_routes.route('/<int:resource_id>', methods=['DELETE'])
@login_required
def delete_resource(resource_id):
    resource = Resource.query.get(resource_id)
    if resource and resource.topic.user_id == current_user.id:
        db.session.delete(resource)
        db.session.commit()
        return jsonify({'message': 'Resource deleted'}), 204
    return jsonify({'message': 'Permission denied'}), 403
