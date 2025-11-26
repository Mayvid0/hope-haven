import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RSVPConfirmationRequest {
  name: string;
  email: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, eventTitle, eventDate, eventTime, eventLocation }: RSVPConfirmationRequest = await req.json();

    console.log("Sending RSVP confirmation to:", email);

    const emailResponse = await resend.emails.send({
      from: "Events <onboarding@resend.dev>",
      to: [email],
      subject: `RSVP Confirmed: ${eventTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0F766E;">Your RSVP is Confirmed!</h1>
          <p>Dear ${name},</p>
          <p>Thank you for registering for our event. We're excited to see you there!</p>
          
          <div style="background-color: #F0FDFA; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #0F766E; margin-top: 0;">Event Details</h2>
            <p><strong>Event:</strong> ${eventTitle}</p>
            <p><strong>Date:</strong> ${new Date(eventDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
            <p><strong>Time:</strong> ${eventTime}</p>
            <p><strong>Location:</strong> ${eventLocation}</p>
          </div>
          
          <p>If you have any questions, please don't hesitate to contact us.</p>
          <p>We look forward to seeing you at the event!</p>
          
          <p style="color: #64748B; font-size: 12px; margin-top: 40px;">
            This is an automated confirmation email. Please do not reply to this message.
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-rsvp-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
