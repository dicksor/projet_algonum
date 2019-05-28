class Node {
	constructor(label) {
		this.label = label;
		this.visited = false;
		this.parent = label;
	}

	getLabel()
	{
		return this.label;
	}

	getVisit()
	{
		return this.visited;
	}

	setVisited(visited)
	{
		this.visited = visited;
	}

}