import { createUser } from "@/lib/actions/user.action";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("webhook is being hit!");
  try {
    console.log("verifying webhook");
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console

    const eventType = evt.type;
    if (eventType === "user.created") {
      console.log("user creating");
      console.log("userId:", evt.data.id);

      const { id, first_name, last_name, image_url, email_addresses } =
        evt.data;

      const mongoUser = await createUser({
        clerkId: id,
        name: `${first_name} ${last_name ? `${last_name}` : ""}`,
        email: email_addresses[0].email_address,
        picture: image_url,
      });
      return NextResponse.json({ message: "Ok", mongoUser });
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
