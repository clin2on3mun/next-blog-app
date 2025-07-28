import Email from "../../../lib/models/EmailModel";
import { DB } from "../../../lib/config/db";
import { NextResponse } from "next/server";



const loadDb = async()=>{
    return await DB
}
loadDb()

export async function GET(request){
   const emails =  await Email.find({})
   return NextResponse.json({emails})
}

export async function POST(request){
    const formData = await request.formData()
    const emailData={
        email: `${formData.get('email')}`
    }
    await Email.create(emailData)
    return NextResponse.json({success:true, msg:'Email subscribed'})
}


export async function DELETE(request){
    const emailId = await request.nextUrl.searchParams.get('id')

    await Email.findByIdAndDelete(emailId)

    return NextResponse.json({success:true, msg:'Email Deleted'})

}