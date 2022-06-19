const LandingFAQ = () => {
  return (
    <section className="flex flex-col items-center my-8 mx-4 md:w-2/3 md:mx-auto xl:w-1/2">
      <h2 className="text-2xl font-semibold mb-4 lg:text-4xl lg:mt-12 xl:text-5xl">
        Preguntas Frecuentes
      </h2>
      <article className="border-2 border-gray-300 rounded-md p-3 my-2">
        <h3 className="text-primary font-bold">¿Compartir cuentas es legal?</h3>
        <p className="text-dark-sub">
          Sí 😉, los planes multicuenta existen para eso. Cada servicio tiene
          sus propias normas para compartir cuentas. <br /> En el caso de Disney
          + la cuenta se puede compartir con cualquier persona, así no sea de la
          misma familia.
        </p>
      </article>
      <article className="border-2 border-gray-300 rounded-md p-3 my-2">
        <h3 className="text-primary font-bold">¿Y si ya lo hago?</h3>
        <p className="text-dark-sub">
          Lo sabemos. En Konto te brindamos la facilidad de pagos y cobros
          automáticos. Asi que si deseas comenzar a compartir sin la molestia de
          tener que recordar a los miembros de su grupo de intercambio que
          paguen por su parte cada mes. Konto es el lugar para tí !!!
        </p>
      </article>
      <article className="border-2 border-gray-300 rounded-md p-3 my-2">
        <h3 className="text-primary font-bold">¿Que formas de pago hay?</h3>
        <p className="text-dark-sub">
          Actualmente puedes pagar con Yape. En Konto nos encanta escuchar a
          nuestros usuarios, por ello si tienes otro método de pago preferido,{' '}
          <a
            href="https://wa.me/51989009435"
            target="_blank"
            className="text-green-400 font-bold"
          >
            Escríbenos
          </a>
          .
        </p>
      </article>
      <article className="border-2 border-gray-300 rounded-md p-3 my-2">
        <h3 className="text-primary font-bold">¿Es seguro?</h3>
        <p className="text-dark-sub">
          Tu seguridad es lo más importante para nosotros. Por ello:
        </p>

        <ul>
          <li>
            • En la plataforma podrás ver si las credenciales del grupo han sido
            verificadas
          </li>
          <li>
            • Hay un periodo de validación para proteger a los joiner en caso de
            problemas. Por el momento es de 14 días.
          </li>
          <li>
            • Como admin cuando alguien se una a tu grupo, recibirás el monto
            automáticamente en tu wallet y podrás retirarlo después del periodo
            de validación.
          </li>
          <li>
            • Como Joiner tendrás 14 días para presentar un reclamo y solicitar
            reembolso.
          </li>
        </ul>
      </article>
    </section>
  );
};

export default LandingFAQ;
