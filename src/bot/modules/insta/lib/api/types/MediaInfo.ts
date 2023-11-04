export interface MediaInfo {
  items: MediaItem[];
  num_results: number;
  more_available: boolean;
  auto_load_more_enabled: boolean;
  status: string;
}

export interface MediaItem {
  taken_at: number;
  pk: any;
  id: string;
  device_timestamp: number;
  client_cache_key: string;
  filter_type: number;
  caption_is_edited: boolean;
  like_and_view_counts_disabled: boolean;
  strong_id__: string;
  is_reshare_of_text_post_app_media_in_ig: boolean;
  is_post_live_clips_media: boolean;
  deleted_reason: number;
  integrity_review_decision: string;
  has_shared_to_fb: number;
  is_unified_video: boolean;
  should_request_ads: boolean;
  is_visual_reply_commenter_notice_enabled: boolean;
  commerciality_status: string;
  explore_hide_comments: boolean;
  shop_routing_user_id: any;
  can_see_insights_as_brand: boolean;
  is_organic_product_tagging_eligible: boolean;
  fb_like_count?: number;
  has_liked: boolean;
  like_count: number;
  top_likers: any[];
  video_subtitles_confidence?: number;
  media_type: number;
  code: string;
  can_viewer_reshare: boolean;
  caption: MediaCaption;
  clips_tab_pinned_user_ids: any[];
  original_media_has_visual_reply_media: boolean;
  invited_coauthor_producers: any[];
  can_viewer_save: boolean;
  is_in_profile_grid: boolean;
  profile_grid_control_enabled: boolean;
  featured_products: any[];
  is_comments_gif_composer_enabled: boolean;
  product_suggestions: any[];
  user: User;
  image_versions2: ImageVersions2;
  original_width: number;
  original_height: number;
  is_artist_pick?: boolean;
  enable_media_notes_production: boolean;
  product_type: string;
  is_paid_partnership: boolean;
  reshare_count?: number;
  organic_tracking_token: string;
  is_third_party_downloads_eligible?: boolean;
  commerce_integrity_review_decision: string;
  ig_media_sharing_disabled: boolean;
  is_open_to_public_submission: boolean;
  comment_threading_enabled: boolean;
  max_num_visible_preview_comments: number;
  has_more_comments: boolean;
  preview_comments: any[];
  comment_count: number;
  can_view_more_preview_comments: boolean;
  hide_view_all_comment_entrypoint: boolean;
  inline_composer_display_condition: string;
  inline_composer_imp_trigger_time?: number;
  has_delayed_metadata: boolean;
  is_auto_created: boolean;
  is_quiet_post: boolean;
  is_cutout_sticker_allowed: boolean;
  enable_waist: boolean;
  owner: User;
  is_dash_eligible?: number;
  video_dash_manifest?: string;
  video_codec?: string;
  number_of_qualities?: number;
  video_versions?: VideoVersion[];
  has_audio?: boolean;
  video_duration?: number;
  photo_of_you?: boolean;
  facepile_top_likers?: any[];
  all_previous_submitters?: any[];
  crosspost?: string[];
  carousel_media_count?: number;
  carousel_media?: CarouselMedia[];
  carousel_media_ids?: string[];
  carousel_media_pending_post_count?: number;
  comments?: any[];
}

interface MediaCaption {
  pk: string;
  user_id: any;
  user: User;
  type: number;
  text: string;
  did_report_as_spam: boolean;
  created_at: number;
  created_at_utc: number;
  content_type: string;
  status: string;
  bit_flags: number;
  share_enabled: boolean;
  is_ranked_comment: boolean;
  is_covered: boolean;
  private_reply_status: number;
  media_id: any;
}

interface User {
  fbid_v2: string;
  feed_post_reshare_disabled: boolean;
  full_name: string;
  id: string;
  is_private: boolean;
  is_unpublished: boolean;
  pk: any;
  pk_id: string;
  show_account_transparency_details: boolean;
  strong_id__: string;
  third_party_downloads_enabled: number;
  account_badges: any[];
  has_anonymous_profile_picture: boolean;
  is_favorite: boolean;
  is_verified: boolean;
  latest_reel_media: number;
  profile_pic_id: string;
  profile_pic_url: string;
  transparency_product_enabled: boolean;
  username: string;
}

interface ImageVersions2 {
  candidates: Candidate[];
  additional_candidates?: AdditionalCandidates;
  smart_thumbnail_enabled?: boolean;
  scrubber_spritesheet_info_candidates?: ScrubberSpritesheetInfoCandidates;
}

interface Candidate {
  width: number;
  height: number;
  url: string;
  scans_profile?: string;
}

interface AdditionalCandidates {
  igtv_first_frame: IgtvFirstFrame;
  first_frame: FirstFrame;
  smart_frame: any;
}

interface IgtvFirstFrame {
  width: number;
  height: number;
  url: string;
  scans_profile: string;
}

interface FirstFrame {
  width: number;
  height: number;
  url: string;
  scans_profile: string;
}

interface ScrubberSpritesheetInfoCandidates {
  default: Default;
}

interface Default {
  video_length: number;
  thumbnail_width: number;
  thumbnail_height: number;
  thumbnail_duration: number;
  sprite_urls: string[];
  thumbnails_per_row: number;
  total_thumbnail_num_per_sprite: number;
  max_thumbnails_per_sprite: number;
  sprite_width: number;
  sprite_height: number;
  rendered_width: number;
  file_size_kb: number;
}

interface VideoVersion {
  type: number;
  width: number;
  height: number;
  url: string;
  id: string;
}

interface CarouselMedia {
  id: string;
  explore_pivot_grid: boolean;
  product_type: string;
  media_type: number;
  image_versions2: ImageVersions2;
  original_width: number;
  original_height: number;
  video_versions?: VideoVersion[];
  has_audio?: boolean;
  video_duration?: number;
  is_dash_eligible?: number;
  video_dash_manifest?: string;
  video_codec?: string;
  number_of_qualities?: number;
  carousel_parent_id: string;
  strong_id__: string;
  pk: number;
  commerciality_status: string;
  taken_at: number;
  preview: string;
  featured_products: any[];
  shop_routing_user_id: any;
  product_suggestions: any[];
}
