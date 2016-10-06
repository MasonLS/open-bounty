describe('Project Add Service', function() {

    beforeEach(module('OpenBounty'));

    let $rootScope;
    let ProjectFactory;
    let $httpBackend;
    let AuthService;

    beforeEach(inject(function(_$rootScope_, _ProjectFactory_, _$httpBackend_, _AuthService_) {
        $rootScope = _$rootScope_;
        ProjectFactory = _ProjectFactory_;
        $httpBackend = _$httpBackend_;
        AuthService = _AuthService_;
    }));

    // Test if factory exists
    it('should be an object', function() {
        expect(ProjectFactory).to.be.an('object');
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    it('it retrieves project by userId', function() {

        let stub = sinon.stub(AuthService, 'getLoggedInUser', function() {
            return Promise.resolve({
                id: 1
            });
        });

        $httpBackend.expectGET('/api/projects/all/owner/1') // ensure GET
            .respond(200, [{
                id: 1,
                repoId: 66979712,
                name: 'fsg',
                description: 'test',
                raised: 0,
                paidOut: 0,
                createdAt: '2016-10-06T14:22:46.152Z',
                updatedAt: '2016-10-06T14:22:46.152Z',
                ownerId: 1
            }]);

        setTimeout(function() {
            $httpBackend.flush();
        }, 500)

        return ProjectFactory.findProject(1).then(function(foundProjects) {
            stub.restore();
            expect(foundProjects[0].name).to.be.equal('fsg');

        });




    });

});
