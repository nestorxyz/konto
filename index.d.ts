import { PrismaClient } from '@prisma/client';

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
