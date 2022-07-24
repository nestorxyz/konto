import mixpanel from 'mixpanel-browser';

if (process.env.NEXT_PUBLIC_IS_MIXPANEL_ENABLED) {
  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || '');
}

export default mixpanel;
