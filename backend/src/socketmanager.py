import socketio
subscribers : dict = {}


def handle_connect(sid, environ):
    print(f"Socket connected with sid {sid}")

class SocketManager:
    def __init__(self):
        self.server = socketio.AsyncServer(
            cors_allowed_origins=['*', "http://localhost:5000"],
            async_mode="asgi"
        )
        self.app = socketio.ASGIApp(self.server)

    @property
    def on(self):
        return self.server.on

    @property
    def send(self):
        return self.server.send

    def mount_to(self, path: str, app: socketio.ASGIApp):
        app.mount(path, self.app)


socket_manager = SocketManager()
socket_manager.on("connect", handler=handle_connect)
