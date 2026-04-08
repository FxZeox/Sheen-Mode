import { NextResponse } from "next/server";

import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = String(formData.get("folder") ?? "sheen-mode");

    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, message: "Image file is required." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploaded = await uploadToCloudinary(buffer, folder);

    return NextResponse.json({ success: true, url: uploaded.secure_url, publicId: uploaded.public_id }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to upload file.";

    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}