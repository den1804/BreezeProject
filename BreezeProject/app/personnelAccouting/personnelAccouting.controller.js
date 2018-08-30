(function () {
    'use strict';

    angular.module('app').controller('PersonnelAccountingController', PersonnelAccountingController);

    PersonnelAccountingController.$inject = ['$scope', 'breeze'];

    function PersonnelAccountingController($scope, breeze) {
        var vm = this;

        $scope.filteredEmployees = []
            , $scope.currentPage = 1
            , $scope.numPerPage = 3
            , $scope.maxSize = 5;
            
        vm.newItem = {};
        vm.refreshData = refreshData;
        vm.isItemExists = isItemExists;
        vm.saveChanges = saveChanges;
        vm.rejectChanges = rejectChanges;
        vm.hasChanges = hasChanges;
        vm.addNewItem = addNewItem;
        vm.deleteItem = deleteItem;
        vm.filterByDepartment = filterByDepartment;

        breeze.NamingConvention.camelCase.setAsDefault();

        var manager = new breeze.EntityManager("breeze/db");
        var departmentsQuery = new breeze.EntityQuery("Departments").using(manager).expand("Employees");
        var employeesQuery = new breeze.EntityQuery("Employees").using(manager);
        var employees;

        activate();

        $scope.$watch('currentPage + numPerPage', function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;

            $scope.filteredEmployees = employees.slice(begin, end);
        });

        function activate() {

            refreshData();

            $scope.$watch('vm.filterDepartment', function (a, b) {
                if (a !== b) {
                    refreshData();
                }
            });
        }

        function refreshData() {

            var query = employeesQuery;
            if (vm.filterDepartment) {
                query = query.where('department.id', breeze.FilterQueryOp.Equals, vm.filterDepartment.id);
            }

            departmentsQuery.execute()
                .then(
                function (data) {
                    vm.departments = data.results;
                })
                .then(
                function () {
                    vm.employees = query.executeLocally();
                    employees = query.executeLocally();
                });
        }

        function filterByDepartment(depart) {
            if (vm.filterDepartment && vm.filterDepartment.name === depart.name) {
                vm.filterDepartment = undefined;
            } else {
                vm.filterDepartment = depart;
            }
        }

        function saveChanges() {
            manager.saveChanges();
        }

        function rejectChanges() {
            manager.rejectChanges();
        }

        function hasChanges() {
            return manager.hasChanges();
        }

        function addNewItem() {
            var department = vm.departments.filter(function (x) { return x.name === vm.newItem.department; });

            if (department.length === 0) {
                department = manager.createEntity('Department', { name: vm.newItem.department });
                vm.departments.push(department);
            } else {
                department = department[0];
            }

            var item = manager.createEntity('Employee', {
                firstName: vm.newItem.firstName,
                lastName: vm.newItem.lastName,
                age: vm.newItem.age,
                salary: vm.newItem.salary,
                dateToStartWork: new Date(),
                department: vm.newItem.department.id,
                isWork: true
            });
            vm.employee.push(item);

            vm.newItem = {};
        }

        function deleteItem(item) {
            item.entityAspect.setDeleted();
        }

        function isItemExists(x) {
            return x.entityAspect.entityState.firstName !== 'Deleted' && x.entityAspect.entityState.firstName !== 'Detached';
        }
    }
})();