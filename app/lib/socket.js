import { Server } from 'socket.io';

let io;

export function initSocket(server) {
  if (!io) {
    io = new Server(server, {
      cors: {
        origin: '*',
      },
    });

    io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });

      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    });
  }
  return io;
}
