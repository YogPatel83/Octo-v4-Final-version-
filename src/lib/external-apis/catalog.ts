export const EXTERNAL_API_CATALOG = {
  ads: {
    providers: ["meta_ads", "google_ads", "tiktok_ads", "linkedin_ads"],
    actions: ["create_campaign", "draft_ad", "publish_ad", "pause_campaign", "get_analytics"]
  },
  crm: {
    providers: ["hubspot", "salesforce", "zoho_crm"],
    actions: ["create_lead", "update_lead", "create_deal", "get_contacts", "send_sequence"]
  },
  accounting: {
    providers: ["quickbooks", "xero", "zoho_books"],
    actions: ["create_invoice", "get_invoices", "create_expense", "get_profit_loss", "reconcile"]
  },
  payouts: {
    providers: ["wise", "payoneer", "manual_bank", "razorpayx"],
    actions: ["create_payout", "check_balance", "get_payout_status", "cancel_payout"]
  },
  ecommerce: {
    providers: ["shopify", "woocommerce"],
    actions: ["create_product", "update_product", "get_orders", "fulfill_order", "get_customers"]
  },
  procurement: {
    providers: ["alibaba", "indiamart", "email_vendor", "custom_vendor_api"],
    actions: ["search_supplier", "send_rfq", "compare_quotes", "create_purchase_request"]
  },
  logistics: {
    providers: ["shiprocket", "dhl", "fedex", "ups", "google_maps"],
    actions: ["create_shipment", "track_shipment", "estimate_delivery", "calculate_route"]
  },
  calendar: {
    providers: ["google_calendar", "microsoft_calendar"],
    actions: ["create_event", "update_event", "cancel_event", "find_free_time"]
  },
  voice_calling: {
    providers: ["twilio", "vapi", "retell", "bland"],
    actions: ["make_call", "end_call", "get_transcript", "schedule_call"]
  },
  three_d_cad: {
    providers: ["meshy", "tripo", "stability_3d", "custom_cad"],
    actions: ["generate_3d_model", "convert_model", "analyze_design", "export_file"]
  },
  design: {
    providers: ["figma", "canva"],
    actions: ["create_design", "update_design", "export_asset", "create_template"]
  },
  cloud_files: {
    providers: ["dropbox", "onedrive", "box"],
    actions: ["upload_file", "read_file", "search_files", "share_file"]
  },
  analytics: {
    providers: ["ga4", "mixpanel", "posthog"],
    actions: ["get_report", "track_event", "get_funnel", "get_retention"]
  },
  custom: {
    providers: ["custom_rest_api"],
    actions: ["call_endpoint"]
  }
};
