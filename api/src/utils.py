def register_blueprints(app, blueprings, url_prefix):
    for blueprint in blueprings:
        app.register_blueprint(blueprint, url_prefix=url_prefix)