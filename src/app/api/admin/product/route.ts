import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";
import { dbConnect } from "@/lib/mongodb";
import { ProductSettings } from "@/lib/models/product-settings";
import { defaultProductContent } from "@/lib/product-content";

const productSchema = z.object({
  name: z.string().min(2),
  price: z.number().min(1),
  size: z.string().min(2),
  shortDescription: z.string().min(10),
  longDescription: z.string().min(20),
  stock: z.string().min(2),
});

async function isAuthorized() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  return Boolean(verifyAdminSessionToken(token));
}

export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  await dbConnect();
  const settings = await ProductSettings.findOne({}).sort({ updatedAt: -1 }).lean();

  return NextResponse.json({ success: true, product: settings ?? defaultProductContent }, { status: 200 });
}

export async function PUT(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const payload = productSchema.parse(await request.json());

    await dbConnect();
    const existing = await ProductSettings.findOne({}).sort({ updatedAt: -1 });

    if (!existing) {
      const created = await ProductSettings.create(payload);
      return NextResponse.json({ success: true, product: created }, { status: 200 });
    }

    existing.name = payload.name;
    existing.price = payload.price;
    existing.size = payload.size;
    existing.shortDescription = payload.shortDescription;
    existing.longDescription = payload.longDescription;
    existing.stock = payload.stock;
    await existing.save();

    return NextResponse.json({ success: true, product: existing }, { status: 200 });
  } catch (error) {
    const message = error instanceof z.ZodError ? error.issues[0]?.message ?? "Invalid input." : "Unable to save product settings.";

    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
