
var jsonData = {
    "people": [
        {
            "person": {
                "firstName": "bob",
                "lastName": "smith",
                "sex": "male",
                "age": 25
            }
        },
        {
            "person": {
                "firstName": "john",
                "lastName": "smith",
                "sex": "male",
                "age": 60
            }
        },
        {
            "person": {
                "firstName": "jane",
                "lastName": "smith",
                "sex": "female",
                "age": 23
            }
        },
        {
            "person": {
                "firstName": "bob",
                "lastName": "jones",
                "sex": "male",
                "age": 34
            }
        },
        {
            "person": {
                "firstName": "bob",
                "lastName": "roberts",
                "sex": "male",
                "age": 33
            }
        },
        {
            "person": {
                "firstName": "jane",
                "lastName": "roberts",
                "sex": "female",
                "age": 36
            }
        }
    ]
};

describe("Simple Angular Controller Test => ", function ()
{
    var $scope = {};
    var createMainController;
    var $httpBackend;
    var requestHandler;

    // Test setup 
    beforeEach(module('sortApp'));

    beforeEach(
        inject(function ($injector)
        {
            var $controller = $injector.get('$controller');
            $httpBackend = $injector.get('$httpBackend');

            // ================== define creating controller function ==========================
            createMainController = function ()
            {
                return $controller('mainController', { $scope: $scope}); 
            };

            // ==================  test Controller requests ====================================
            requestHandler = $httpBackend.
                when('GET', 'src/people.json').
                respond(jsonData);

        }));

    afterEach(function ()
    {
        // check that all requests happened 
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    //************************** actual test **************************************
    it("Test 1: mainController should be successfully created and run", function ()
    {
        // controller should send a request $http.get('src/people.json') => let's check it
        $httpBackend.expectGET('src/people.json');
        createMainController();
        $httpBackend.flush();

        // check result of $http.get('src/people.json')
        expect($scope.sushi.people.length).toBe(6);
        expect($scope.sushi.people[0].person.firstName).toBe("bob");
        expect($scope.sushi.people[0].person.lastName).toBe("smith");
        expect($scope.sushi.people[0].person.sex).toBe("male");
        expect($scope.sushi.people[0].person.age).toBe(25);

    });
});
