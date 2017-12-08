package main

import (
	"fmt"
	"strings"
	"strconv"
	"io/ioutil"
)

type Node struct {
	name string
	value int
	children []string
	parent string
	sum int
}

func parseNode(line string) Node {
	lineParts := strings.Split(line, " -> ")
	parentParts := strings.Split(lineParts[0], " (")
	name := parentParts[0];
	
	strValue := parentParts[1][0:len(parentParts[1]) - 1]
	value, err := strconv.Atoi(strValue)

	var node Node
	if err != nil {
		fmt.Println(strValue, "conversion error", err)
	} else if len(lineParts) == 2 {
		node = Node{ name: name, value: value, children: strings.Split(lineParts[1], ", ") }
	} else {
		node = Node{ name: name, value: value }
	}

	node.sum = 1

	return node
}

func solve(towers []string) string {
	var dic = make(map[string]*Node)

	// parse lines into nodes
	for _, tower := range towers {
		node := parseNode(tower)
		dic[node.name] = &node
	}

	// construct tree
	for _, node := range dic {
		if node.children != nil {
			for _, key := range node.children {
				dic[key].parent = node.name
			}
		}		
	}

	// find root node
	var root *Node
	for _,node := range dic {
		if node.parent == "" {
			root = node
			break
		}
	}

	fmt.Println(*root)

	return "end"
}

func main() {
	data, _ := ioutil.ReadFile("input.txt")
	raw := string(data)
	fmt.Println(solve(strings.Split(raw, "\n")))
}