import { PrismaClient } from '@prisma/client';
import { type } from 'os';

declare global {
  var prisma: PrismaClient;
}

type IconProps = {
  fill?: string;
  filled?: boolean;
  size?: number;
  width?: number;
  height?: number;
};
