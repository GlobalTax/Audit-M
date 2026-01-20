import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NotificationRequest {
  leadId: string;
  sendConfirmation?: boolean;
  sendNotification?: boolean;
}

// Send confirmation email to client using Resend
async function sendConfirmationEmail(
  resendApiKey: string,
  toEmail: string,
  name: string,
  sourceSite: string
): Promise<boolean> {
  try {
    const isInternational = sourceSite === 'int';
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: isInternational 
          ? 'NRRO International <info@nrro.es>'
          : 'NRRO - Navarro Tax Legal <info@nrro.es>',
        to: [toEmail],
        subject: isInternational 
          ? 'We have received your message - NRRO International'
          : 'Hemos recibido tu mensaje - NRRO',
        html: isInternational ? `
          <!DOCTYPE html>
          <html>
            <head><meta charset="utf-8"></head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #1a1a1a; margin-bottom: 20px;">Thank you for contacting us, ${name}</h1>
                <p>We have received your message and will get back to you as soon as possible.</p>
                <p>Our team will review your inquiry and respond within 24-48 business hours.</p>
                <div style="margin: 30px 0; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">
                  <p style="margin: 0;"><strong>Contact Information:</strong></p>
                  <p style="margin: 10px 0 0 0;">📞 Phone: +34 93 459 36 00</p>
                  <p style="margin: 5px 0 0 0;">📧 Email: info@nrro.es</p>
                  <p style="margin: 5px 0 0 0;">📍 Carrer Ausias March, 36, 08010 Barcelona</p>
                </div>
                <p style="color: #666; font-size: 14px; margin-top: 30px;">
                  Best regards,<br>
                  <strong>NRRO International Advisory Team</strong>
                </p>
              </div>
            </body>
          </html>
        ` : `
          <!DOCTYPE html>
          <html>
            <head><meta charset="utf-8"></head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #1a1a1a; margin-bottom: 20px;">Gracias por contactarnos, ${name}</h1>
                <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo lo antes posible.</p>
                <p>Nuestro equipo revisará tu consulta y te responderemos en un plazo máximo de 24-48 horas laborables.</p>
                <div style="margin: 30px 0; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">
                  <p style="margin: 0;"><strong>Información de contacto:</strong></p>
                  <p style="margin: 10px 0 0 0;">📞 Teléfono: +34 93 459 36 00</p>
                  <p style="margin: 5px 0 0 0;">📧 Email: info@nrro.es</p>
                  <p style="margin: 5px 0 0 0;">📍 Carrer Ausias March, 36, 08010 Barcelona</p>
                </div>
                <p style="color: #666; font-size: 14px; margin-top: 30px;">
                  Saludos cordiales,<br>
                  <strong>Equipo NRRO - Navarro Tax Legal</strong>
                </p>
              </div>
            </body>
          </html>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('[EMAIL] Resend API error:', errorData);
      return false;
    }

    console.log('[EMAIL] Confirmation email sent successfully to:', toEmail);
    return true;
  } catch (error) {
    console.error('[EMAIL] Error sending confirmation:', error);
    return false;
  }
}

// Send notification email to team
async function sendNotificationEmail(
  resendApiKey: string,
  contactData: any
): Promise<boolean> {
  try {
    const isInternational = contactData.source_site === 'int';
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'NRRO Sistema <info@nrro.es>',
        to: ['info@nrro.es'],
        subject: `${isInternational ? '[INT]' : '[ES]'} Nuevo contacto: ${contactData.name} (${contactData.lead_source || 'manual'})`,
        html: `
          <!DOCTYPE html>
          <html>
            <head><meta charset="utf-8"></head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #1a1a1a; margin-bottom: 20px;">Nuevo mensaje de contacto</h1>
                <div style="background-color: ${isInternational ? '#e8f4fd' : '#f5f5f5'}; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                  <strong>Sitio:</strong> ${isInternational ? '🌍 Internacional (global.nrro.es)' : '🇪🇸 España (nrro.es)'}
                </div>
                <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                  <p><strong>Nombre:</strong> ${contactData.name}</p>
                  <p><strong>Email:</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
                  ${contactData.phone ? `<p><strong>Teléfono:</strong> ${contactData.phone}</p>` : ''}
                  ${contactData.company ? `<p><strong>Empresa:</strong> ${contactData.company}</p>` : ''}
                  <p><strong>Asunto:</strong> ${contactData.subject}</p>
                  <p><strong>Tipo de servicio:</strong> ${contactData.service_type || 'No especificado'}</p>
                  <p><strong>Origen:</strong> ${contactData.lead_source || 'web'}</p>
                </div>
                <div style="background-color: #fff; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                  <h3 style="margin-top: 0;">Mensaje:</h3>
                  <p style="white-space: pre-wrap;">${contactData.message}</p>
                </div>
                <p style="color: #666; font-size: 14px; margin-top: 20px;">
                  <strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}
                </p>
              </div>
            </body>
          </html>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('[EMAIL] Resend notification API error:', errorData);
      return false;
    }

    console.log('[EMAIL] Notification email sent successfully');
    return true;
  } catch (error) {
    console.error('[EMAIL] Error sending notification:', error);
    return false;
  }
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (!resendApiKey) {
      console.error('[NOTIFICATION] RESEND_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body: NotificationRequest = await req.json();
    const { leadId, sendConfirmation = true, sendNotification = true } = body;

    if (!leadId) {
      return new Response(
        JSON.stringify({ error: 'leadId is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('[NOTIFICATION] Processing lead:', leadId);

    // Fetch lead data
    const { data: lead, error: fetchError } = await supabase
      .from('contact_leads')
      .select('*')
      .eq('id', leadId)
      .single();

    if (fetchError || !lead) {
      console.error('[NOTIFICATION] Lead not found:', fetchError);
      return new Response(
        JSON.stringify({ error: 'Lead not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let confirmationSent = false;
    let notificationSent = false;

    // Send confirmation email to client
    if (sendConfirmation && lead.email && !lead.email.includes('pending.com')) {
      console.log('[NOTIFICATION] Sending confirmation email to:', lead.email);
      confirmationSent = await sendConfirmationEmail(
        resendApiKey,
        lead.email,
        lead.name,
        lead.source_site || 'es'
      );
    }

    // Send notification email to team
    if (sendNotification) {
      console.log('[NOTIFICATION] Sending notification email to team');
      notificationSent = await sendNotificationEmail(resendApiKey, lead);
    }

    // Update email_sent status if at least one email was sent
    if (confirmationSent || notificationSent) {
      await supabase
        .from('contact_leads')
        .update({ email_sent: true })
        .eq('id', leadId);
    }

    console.log('[NOTIFICATION] Processing completed:', { confirmationSent, notificationSent });

    return new Response(
      JSON.stringify({ 
        success: true, 
        confirmationSent,
        notificationSent,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('[NOTIFICATION] Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred. Please try again later.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
