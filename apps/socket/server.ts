import express, { Express } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { ACTIONS } from './Actions';

const app: Express = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.get('/', (_req, res) => {
  res.status(200).send('Socket server running');
});

interface UserSocketMap {
  [key: string]: string;
}

const userSocketMap: UserSocketMap = {};

function getAllConnectedClients(roomId: string) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId: string) => ({
      socketId,
      username: userSocketMap[socketId],
    })
  );
}

io.on('connection', (socket: Socket) => {
  console.log('socket connected', socket.id);

  socket.on(
    ACTIONS.JOIN,
    ({ roomId, username }: { roomId: string; username: string }) => {
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
    }
  );

  socket.on(
    'codeChange',
    ({ roomId, code }: { roomId: string; code: string }) => {
      if (!roomId || !code) return;
      socket.to(roomId).emit('updateCode', code);
    }
  );

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

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3002;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
