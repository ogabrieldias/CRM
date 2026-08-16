from backend.app import app as flask_app


def app(environ, start_response):
    path = environ.get("PATH_INFO", "")

    # Remove o prefixo /api
    if path == "/api":
        path = "/"
    elif path.startswith("/api/"):
        path = path[4:]

    # Mantém a raiz como /
    # Para as demais rotas, adiciona / no final.
    if path != "/" and not path.endswith("/"):
        path += "/"

    environ["PATH_INFO"] = path

    return flask_app(environ, start_response)