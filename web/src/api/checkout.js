export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const order = req.body;

    const webhookURL = process.env.DISCORD_WEBHOOK_URL;

    const message = {
      embeds: [
        {
          title: "🔥 NEW ASTRA ORDER",
          color: 0xffffff,
          fields: [
            {
              name: "👤 Customer",
              value:
                `Name: ${order.customer.name}\nPhone: ${order.customer.phone}\nEmail: ${order.customer.email}`,
            },
            {
              name: "📍 Address",
              value:
                `${order.customer.address}\n${order.customer.city}, ${order.customer.governorate}\n${order.customer.postalCode}`,
            },
            {
              name: "🛒 Items",
              value: order.items
                .map((i) => `• ${i.title} x${i.qty}`)
                .join("\n"),
            },
            {
              name: "💰 Total",
              value: order.total,
            },
          ],
          footer: {
            text: "ASTRA STREETWEAR SYSTEM",
          },
        },
      ],
    };

    const response = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error("Discord webhook failed");
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}