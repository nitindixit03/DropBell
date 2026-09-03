import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPriceDropAlert(
  userEmail,
  product,
  oldPrice,
  newPrice,
) {
  try {
    const priceDrop = oldPrice - newPrice;
    const percentageDrop = ((priceDrop / oldPrice) * 100).toFixed(1);

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: userEmail,
      subject: `🎉 Price Drop Alert: ${product.name}`,
      html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>

        <body style="
          margin: 0;
          padding: 0;
          background-color: #050505;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          color: #ffffff;
        ">

          <div style="
            max-width: 600px;
            margin: 0 auto;
            padding: 40px 20px;
          ">

            <!-- Header -->
            <div style="
              background-color: #0a0a0a;
              border: 1px solid #1f1f1f;
              border-bottom: none;
              border-radius: 16px 16px 0 0;
              padding: 32px 30px;
              text-align: center;
            ">

              <div style="
                display: inline-block;
                background-color: #062d20;
                border: 1px solid #145c42;
                color: #34d399;
                padding: 7px 14px;
                border-radius: 999px;
                font-size: 12px;
                font-weight: 600;
                margin-bottom: 18px;
              ">
                ● DROPBELL ALERT
              </div>

              <h1 style="
                margin: 0;
                color: #ffffff;
                font-size: 30px;
                line-height: 1.2;
              ">
                Price Drop Detected
              </h1>

              <p style="
                margin: 10px 0 0;
                color: #71717a;
                font-size: 14px;
              ">
                One of your tracked products just got cheaper.
              </p>

            </div>


            <!-- Main Content -->
            <div style="
              background-color: #0a0a0a;
              padding: 30px;
              border: 1px solid #1f1f1f;
              border-top: 1px solid #171717;
              border-radius: 0 0 16px 16px;
            ">

              ${
                product.image_url
                  ? `
                <div style="
                  text-align: center;
                  margin-bottom: 25px;
                ">
                  <div style="
                    display: inline-block;
                    background-color: #ffffff;
                    padding: 10px;
                    border-radius: 12px;
                    border: 1px solid #262626;
                  ">
                    <img
                      src="${product.image_url}"
                      alt="${product.name}"
                      style="
                        display: block;
                        max-width: 180px;
                        max-height: 180px;
                        width: auto;
                        height: auto;
                        border-radius: 8px;
                      "
                    >
                  </div>
                </div>
              `
                  : ""
              }


              <!-- Product Name -->
              <h2 style="
                color: #e4e4e7;
                margin: 0 0 22px;
                text-align: center;
                font-size: 20px;
                line-height: 1.5;
              ">
                ${product.name}
              </h2>


              <!-- Drop Percentage -->
              <div style="
                background-color: #062d20;
                border: 1px solid #145c42;
                padding: 16px;
                margin: 20px 0;
                border-radius: 10px;
                text-align: center;
              ">

                <div style="
                  color: #6ee7b7;
                  font-size: 14px;
                ">
                  PRICE DROPPED BY
                </div>

                <div style="
                  color: #34d399;
                  font-size: 30px;
                  font-weight: 700;
                  margin-top: 3px;
                ">
                  ↓ ${percentageDrop}%
                </div>

              </div>


              <!-- Price Information -->
              <table
                role="presentation"
                cellspacing="0"
                cellpadding="0"
                style="
                  width: 100%;
                  margin: 25px 0;
                  border-collapse: separate;
                  border-spacing: 0 10px;
                "
              >

                <!-- Previous Price -->
                <tr>
                  <td style="
                    padding: 16px;
                    background-color: #111111;
                    border: 1px solid #202020;
                    border-radius: 10px;
                  ">

                    <div style="
                      font-size: 12px;
                      color: #71717a;
                      text-transform: uppercase;
                      letter-spacing: 1px;
                    ">
                      Previous Price
                    </div>

                    <div style="
                      margin-top: 4px;
                      font-size: 20px;
                      color: #71717a;
                      text-decoration: line-through;
                    ">
                      ${product.currency} ${oldPrice.toFixed(2)}
                    </div>

                  </td>
                </tr>


                <!-- Current Price -->
                <tr>
                  <td style="
                    padding: 18px 16px;
                    background-color: #111111;
                    border: 1px solid #145c42;
                    border-radius: 10px;
                  ">

                    <div style="
                      font-size: 12px;
                      color: #a1a1aa;
                      text-transform: uppercase;
                      letter-spacing: 1px;
                    ">
                      Current Price
                    </div>

                    <div style="
                      margin-top: 4px;
                      font-size: 34px;
                      color: #34d399;
                      font-weight: 700;
                    ">
                      ${product.currency} ${newPrice.toFixed(2)}
                    </div>

                  </td>
                </tr>


                <!-- Savings -->
                <tr>
                  <td style="
                    padding: 16px;
                    background-color: #062d20;
                    border: 1px solid #145c42;
                    border-radius: 10px;
                  ">

                    <div style="
                      font-size: 12px;
                      color: #6ee7b7;
                      text-transform: uppercase;
                      letter-spacing: 1px;
                    ">
                      You Save
                    </div>

                    <div style="
                      margin-top: 4px;
                      font-size: 24px;
                      color: #34d399;
                      font-weight: 700;
                    ">
                      ${product.currency} ${priceDrop.toFixed(2)}
                    </div>

                  </td>
                </tr>

              </table>


              <!-- CTA -->
              <div style="
                text-align: center;
                margin: 30px 0;
              ">

                <a
                  href="${product.url}"
                  style="
                    display: inline-block;
                    background-color: #10b981;
                    color: #03130d;
                    padding: 14px 32px;
                    text-decoration: none;
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 15px;
                  "
                >
                  View Product →
                </a>

              </div>


              <!-- Small Message -->
              <p style="
                margin: 25px 0 0;
                text-align: center;
                color: #52525b;
                font-size: 12px;
              ">
                DropBell was watching. The price moved. We rang the bell.
              </p>


              <!-- Footer -->
              <div style="
                border-top: 1px solid #1f1f1f;
                padding-top: 22px;
                margin-top: 28px;
                text-align: center;
                color: #52525b;
                font-size: 12px;
              ">

                <p style="margin: 0;">
                  You're receiving this email because you're tracking this product on DropBell.
                </p>

                <p style="margin: 12px 0 0;">
                  <a
                    href="${process.env.NEXT_PUBLIC_APP_URL}"
                    style="
                      color: #34d399;
                      text-decoration: none;
                      font-weight: 500;
                    "
                  >
                    View All Tracked Products →
                  </a>
                </p>

              </div>

            </div>

          </div>

        </body>
      </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email error:", error);
    return { error: error.message };
  }
}
