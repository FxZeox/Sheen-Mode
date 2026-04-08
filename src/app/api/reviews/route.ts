import { NextResponse } from "next/server";
import { z } from "zod";

import { dbConnect } from "@/lib/mongodb";
import { Review } from "@/lib/models/review";

const reviewSchema = z.object({
  name: z.string().min(2),
  rating: z.number().int().min(1).max(5),
  message: z.string().min(8),
});

export async function POST(request: Request) {
  try {
    const payload = reviewSchema.parse(await request.json());

    await dbConnect();
    const createdReview = await Review.create({
      ...payload,
      approved: false,
    });

    return NextResponse.json({ success: true, id: createdReview._id }, { status: 201 });
  } catch (error) {
    const message = error instanceof z.ZodError ? error.issues[0]?.message ?? "Invalid input." : "Unable to save review.";

    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}