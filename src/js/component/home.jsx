import React, { useState, useEffect } from "react";

const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [taskList, setTaskList] = useState([]);

	useEffect(() => {
		getData();
	}, []);

	const url = "https://assets.breatheco.de/apis/fake/todos/user/jesiallen";

	const getData = () => {
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then((responseBody) => setTaskList(responseBody))
			.catch((err) => console.log(err));
	};

	const handleClear = () => {
		taskList.length = 0;
		fetch(url, {
			method: "PUT",
			body: JSON.stringify([
				...taskList,
				{ label: "You do not have any tasks", done: false },
			]),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then((response) => {
				console.log("Success:", response);
				getData();
			})
			.catch((error) => console.error(error));
		listItem;
	};

	const handleComplete = (task, i) => {
		let newTaskList = taskList.map((item, index) => {
			if (index == i) {
				item.done = !item.done;
				return item;
			} else {
				return item;
			}
		});
		setTaskList(newTaskList);
		console.log(newTaskList);
		fetch(url, {
			method: "PUT",
			body: JSON.stringify(newTaskList),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then((response) => {
				console.log("Completed:", response);
				getData();
			})
			.catch((error) => console.error(error));
		listItem;
	};

	const handleDelete = (i) => {
		let filtered = taskList.filter((task, index) => i != index);
		fetch(url, {
			method: "PUT",
			body: JSON.stringify(filtered),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then((response) => {
				console.log("Success:", response);
				getData();
			})
			.catch((error) => console.error(error));
		listItem;
	};

	const saveTask = () => {
		let firstTask = taskList.filter(
			(task, index) => task.label != "You do not have any tasks"
		);
		fetch(url, {
			method: "PUT",
			body: JSON.stringify([
				...firstTask,
				{ label: inputValue, done: false },
			]),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then((response) => {
				console.log("Success:", response);
				getData();
			})
			.catch((error) => console.error(error));
		listItem;
		setInputValue("");
	};

	let listItem = taskList.map((task, index) => {
		if (task.done == false) {
			return (
				<li key={task.label} className="d-flex justify-content-between">
					<span onClick={() => handleComplete(task, index)}>
						<i className="fas fa-check"></i>
					</span>
					{task.label}
					<span onClick={() => handleDelete(index)}>
						<i className="fas fa-ban"></i>
					</span>
				</li>
			);
		} else {
			return (
				<li
					key={task.label}
					className="complete d-flex justify-content-between">
					<span onClick={() => handleComplete(task, index)}>
						<i className="fas fa-check completed"></i>
					</span>
					{task.label}
					<span onClick={() => handleDelete(index)}>
						<i className="fas fa-ban"></i>
					</span>
				</li>
			);
		}
	});

	return (
		<div className="container">
			<header className="d-flex justify-content-center fs-2">ToDo</header>
			<div>
				<input
					className="d-flex justify-content-center"
					type="text"
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="What would you like to do?"
					value={inputValue}
					onKeyUp={(e) => {
						if (e.key === "Enter") {
							saveTask();
						}
					}}
				/>
			</div>
			<div>
				<ul>{listItem}</ul>
			</div>
			<button
				className="d-flex justify-content-center m-auto"
				onClick={() => handleClear()}>
				Clear All
			</button>
		</div>
	);
};

export default Home;
