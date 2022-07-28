// Libraries
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { Button } from '@nextui-org/react';

// Types
import { LiteralUnion, ClientSafeProvider } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

// Helpers
import { classNames, mapServiceToImage } from 'lib/logicFunctions';

interface ILoginProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
  callbackUrl?: string;
  showLogo?: boolean;
  className?: string;
}

const Login: React.FC<ILoginProps> = ({
  providers,
  callbackUrl,
  showLogo = true,
  className,
}) => {
  return (
    <div
      className={classNames(
        className,
        'flex flex-col items-center justify-center lg:justify-start flex-1 px-4'
      )}
    >
      {showLogo && <img src="/logo.svg" className="mb-6" />}
      <p className="text-gray-800 text-center text-4xl font-bold mb-4">
        Hola! Bienvenido a Konto
      </p>
      <p className="text-gray-700 font-medium text-center mb-10">
        Ingresa a tu cuenta para empezar a comprar en grupo tus suscripciones
        favoritas
      </p>
      <div className="flex flex-col gap-4">
        {providers &&
          Object.values(providers).map((provider) => (
            <Button
              key={provider.name}
              auto
              ghost
              size="xl"
              onClick={() => signIn(provider.id, { callbackUrl: callbackUrl })}
            >
              <span className="flex gap-2 items-center">
                <div className="w-5 h-5 relative">
                  <Image
                    src={mapServiceToImage(provider.name)}
                    className="object-cover"
                    layout="fill"
                  />
                </div>
                Ingresar con {provider.name}
              </span>
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Login;
