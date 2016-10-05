describe('Project Add Service', function () {

    beforeEach(module('ProjectFactory'));

    var $rootScope;
    var ProjectFactory;
    beforeEach(inject(function (_$rootScope_, _ProjectFactory_) {
        $rootScope = _$rootScope_;
        ProjectFactory = _ProjectFactory_;
    }));


    it('should be an object', function () {
        expect(ProjectFactory).to.be.an('object');
    });

    // it('should by default have id and user as null', function () {
    //     expect(Session.user).to.be.equal(null);
    //     expect(Session.id).to.be.equal(null);
    // });

    // describe('create method', function () {

    //     it('should when called with id and user arguments' +
    //     'set the id and user to session', function () {
    //         var id = 'testId';
    //         var user = {};
    //         Session.create(id, user);
    //         expect(Session.user).to.be.equal(user);
    //         expect(Session.id).to.be.equal(id);
    //     });

    // });



});
