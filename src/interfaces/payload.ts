import UserInterface from '@/interfaces/user.payload';
import TokenInterface from '@/interfaces/token';

interface Payload {
  user: UserInterface,
  token: TokenInterface,
  exp: number,
  isOnline: boolean,
};

export default Payload;