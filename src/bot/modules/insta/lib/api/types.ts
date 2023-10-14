// deno-lint-ignore-file no-namespace
export namespace InstaPost {
  export interface ResponseData {
    items: PostItem[];
    num_results: number;
    more_available: boolean;
    auto_load_more_enabled: boolean;
    status: string;
  }

  interface PostItem {
    id: string;
    code: string;
    taken_at: number;
    user: InstaUser;
    can_viewer_reshare: boolean;
    caption_is_edited: boolean;
    like_and_view_counts_disabled: boolean;
    is_paid_partnership: boolean;
    is_affiliate: boolean;
    comment_count: number;
    image_versions2: ImageVersions2;
    original_width: number;
    original_height: number;
    has_liked: boolean;
    can_see_insights_as_brand: boolean;
    caption: ItemCaption;
    sharing_friction_info: SharingFrictionInfo;
    like_count: number;
    carousel_media: CarouselMedia[];
    media_type: number;
    timeline_pinned_user_ids: any[];
    location: Location;
  }

  interface CarouselMedia {
    media_type: number;
    pk: string;
    shortcode: string;
    image_versions2: ImageVersions2;
    video_versions?: VideoVersions;
  }

  interface ImageVersions2 {
    candidates: ImageCandidate[];
  }

  interface VideoVersions {
    candidates: VideoCandidate[];
  }

  interface Location {
    pk: string;
    name: string;
    short_name: string;
  }

  interface SharingFrictionInfo {
    should_have_sharing_friction: boolean;
    bloks_app_url: null;
  }
}

export namespace InstaReel {
  export interface ResponseData {
    items: ReelItem[];
    num_results: number;
    more_available: boolean;
    auto_load_more_enabled: boolean;
    status: string;
  }

  interface ReelItem {
    id: string;
    code: string;
    taken_at: number;
    user: InstaUser;
    can_viewer_reshare: boolean;
    caption_is_edited: boolean;
    like_and_view_counts_disabled: boolean;
    is_paid_partnership: boolean;
    is_affiliate: boolean;
    comment_count: number;
    image_versions2: ImageVersions2;
    original_width: number;
    original_height: number;
    has_liked: boolean;
    can_see_insights_as_brand: boolean;
    caption: ItemCaption;
    sharing_friction_info: SharingFrictionInfo;
    play_count: number;
    view_count: number;
    video_duration: number;
    has_audio: boolean;
    product_type: string;
    video_versions: VideoCandidate[];
    is_dash_eligible: boolean;
    number_of_qualities: number;
    like_count: number;
    clips_metadata: ClipsMetadata;
    carousel_media: CarouselMedia[];
    media_type: number;
    timeline_pinned_user_ids: any[];
  }

  interface CarouselMedia {
    media_type: number;
  }

  interface ClipsMetadata {
    artist_name: string;
    song_name: string;
    uses_original_audio: boolean;
    should_mute_audio: boolean;
    should_mute_audio_reason: string;
    audio_id: string;
  }

  interface ImageVersions2 {
    candidates: ImageCandidate[];
  }

  interface SharingFrictionInfo {
    should_have_sharing_friction: boolean;
    bloks_app_url: null;
  }
}

interface InstaUser {
  pk: string;
  username: string;
  profile_pic_url: string;
  is_private: boolean;
  is_verified: boolean;
  full_name: string;
}

interface ItemCaption {
  created_at: string;
  text: string;
}

interface ImageCandidate {
  width: number;
  height: number;
  url: string;
}

interface VideoCandidate {
  url: string;
}
