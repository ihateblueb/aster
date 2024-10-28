let defaults = {
    debug: false,
    
    homeTab: 'public',
    exploreTab: 'local',
    notificationsTab: 'all',

    locale: 'en_US',
    colorscheme: '',
    theme: '',
    font: '',

    self: undefined,
    token: undefined
}

class LocalStore {
    public defaults = defaults;

    public get(key: string) {
        return localStorage.getItem(key);
        // TODO: fallback to defaults
    }
}

export default new LocalStore();