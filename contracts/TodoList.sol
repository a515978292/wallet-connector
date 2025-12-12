// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TodoList {
    struct Todo {
        string content;
        bool completed;
    }

    // 每个用户有自己的todo列表
    mapping(address => Todo[]) private todos;

    // 事件
    event TodoAdded(address indexed user, uint256 index, string content);
    event TodoToggled(address indexed user, uint256 index, bool completed);
    event TodoDeleted(address indexed user, uint256 index);

    // 添加todo
    function addTodo(string memory _content) public {
        require(bytes(_content).length > 0, "Content cannot be empty");
        todos[msg.sender].push(Todo(_content, false));
        emit TodoAdded(msg.sender, todos[msg.sender].length - 1, _content);
    }

    // 切换完成状态
    function toggleTodo(uint256 _index) public {
        require(_index < todos[msg.sender].length, "Invalid index");
        todos[msg.sender][_index].completed = !todos[msg.sender][_index].completed;
        emit TodoToggled(msg.sender, _index, todos[msg.sender][_index].completed);
    }

    // 删除todo
    function deleteTodo(uint256 _index) public {
        require(_index < todos[msg.sender].length, "Invalid index");

        // 移动最后一个元素到删除位置（swap and pop）
        uint256 lastIndex = todos[msg.sender].length - 1;
        if (_index != lastIndex) {
            todos[msg.sender][_index] = todos[msg.sender][lastIndex];
        }
        todos[msg.sender].pop();

        emit TodoDeleted(msg.sender, _index);
    }

    // 获取所有todos
    function getTodos() public view returns (Todo[] memory) {
        return todos[msg.sender];
    }

    // 获取todo数量
    function getTodoCount() public view returns (uint256) {
        return todos[msg.sender].length;
    }

    // 获取单个todo
    function getTodo(uint256 _index) public view returns (string memory content, bool completed) {
        require(_index < todos[msg.sender].length, "Invalid index");
        Todo memory todo = todos[msg.sender][_index];
        return (todo.content, todo.completed);
    }
}
