class ApActorRenderer {
    public render(user) {
        let apActor = {
            type: user.automated ? 'Service' : 'Person',
        }

        return apActor;
    }
}

export default new ApActorRenderer();