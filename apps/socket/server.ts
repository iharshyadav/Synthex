import express, { Express, Request, Response, NextFunction } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { ACTIONS } from './Actions';
import path from 'path';

const app: Express = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.static('build'));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

interface UserSocketMap {
  [key: string]: string;
}

const userSocketMap: UserSocketMap = {};

function getAllConnectedClients(roomId: string) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId: string) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
}

io.on('connection', (socket: Socket) => {
  console.log('socket connected', socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, username }: { roomId: string; username: string }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  socket.on("codeChange", ({ roomId, code }: { roomId: string; code: string }) => {
    if (!roomId || !code) return;
    console.log(code)
    socket.to(roomId).emit("updateCode", code);
  });

  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      if (roomId !== socket.id) {
        socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
          socketId: socket.id,
          username: userSocketMap[socket.id],
        });
        socket.leave(roomId);
      }
    });
    delete userSocketMap[socket.id];
  });
});

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3002;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));