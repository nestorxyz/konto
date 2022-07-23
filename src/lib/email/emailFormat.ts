interface IEmailFormatParams {
  title: string;
  body: string;
  ctaText: string;
  ctaLink: string;
  ctaType: 'button' | 'link';
}

export const emailFormat = (params: IEmailFormatParams) => {
  const { title, body, ctaText, ctaLink, ctaType } = params;

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Konto</title>
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    </head>
    <body
      style="
        font-family: Arial;
        background-color: #f9fafb;
        width: 100%;
      "
    >
      <table style="display: flex; flex-direction: column; align-items: center; max-width: 600px; margin: auto;">
        <tr>
          <td align="center">
            <img
              src="https://kontope.com/logo.png"
              alt="Konto"
              title="Konto"
              style="display:block"
              width="100"
              height="105"
            />
          </td>
        </tr>
        <tr>
          <td>
            <p
              style="
                font-family: inherit;
                text-align: center;
                font-weight: 700;
                font-size: 48px;
                color: #1f2937;
              "
            >
              ${title}
            </p>
          </td>
        </tr>

        <tr>
          <td>
            <p
              style="
                margin: 0 32px;
                text-align: center;
                font-weight: 400;
                font-size: 24px;
              "
            >
              ${body}
            </p>
          </td>
        </tr>

        <tr>
          <td colspan="3" height="30">&nbsp;</td>
        </tr>
        <tr>
          <td colspan="3" height="30">&nbsp;</td>
        </tr>

        ${
          ctaType === 'button'
            ? `
          <tr>
            <td colspan="3" align="center">
              <a
                style="
                  background-color: #185adb;
                  border-radius: 15px;
                  color: white;
                  padding: 16px 32px;
                  text-decoration: none;
                  font-weight: 600;
                  font-size: 24px;
                  cursor: pointer;
                  margin-top: 42px;
                  margin: 0 32px;
                "
                href=${ctaLink}
                target="_blank"
                >
                ${ctaText}
                </a
              >
            </td>
          </tr>`
            : `
          <tr>
            <td colspan="3" align="center">
              <a
                style="
                  color: #185abd;
                  border-radius: 20px;
                  margin-top: 42px;
                  text-decoration: none;
                  font-size: 24px;
                  font-weight: 500;
                  max-width: 386px;
                  text-align: center;
                  overflow-wrap: break-word;
                "
                target="_blank"
                href=${ctaLink}
              >
                ${ctaText}
              </a>
            </td>
          </tr>`
        }

        <tr>
          <td colspan="3" height="80">&nbsp;</td>
        </tr>

        <tr>
          <td
            style="
            background-color: #071c43;
            width: 100%;
            height: 85px;
            color: white;
            font-size: 24px;
            font-weight: 500;
            margin-top: 80px;
            text-align: center;
            "
          >
            Enviado con 💙 desde Konto.
          </td>
        </tr>
      </table>
    </body>
  </html>`;
};
