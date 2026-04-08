import { NextResponse } from "next/server";
import { z } from "zod";

import { dbConnect } from "@/lib/mongodb";
import { ContactMessage } from "@/lib/models/contact-message";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const payload = contactSchema.parse(await request.json());

    await dbConnect();
    const createdMessage = await ContactMessage.create(payload);

    return NextResponse.json({ success: true, id: createdMessage._id }, { status: 201 });
  } catch (error) {
    const message = error instanceof z.ZodError ? error.issues[0]?.message ?? "Invalid input." : "Unable to save contact message.";

    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}