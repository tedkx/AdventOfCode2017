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
	childrenSum int
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

func sumChildren(dic map[string]*Node, nodeName string) (int, int) {
	node := *dic[nodeName]
	if node.children == nil {
		return node.value, 0
	}

	var sum int = 0
	weights := make(map[int][]string)
	for _, child := range node.children {
		weight, balanced := sumChildren(dic, child)
		
		if balanced != 0 {
			return 0, balanced
		}

		if val, ok := weights[weight]; ok {
			weights[weight] = append(val, child)
		} else {
			weights[weight] = []string{ child }
		}	

		sum += weight
	}

	if len(weights) == 1 {
		return node.value + sum, 0
	}

	fmt.Println("node", node, "weights", weights)
	var common, unbalanced int = -1, -1
	var unbalancedNode Node
	for k, arr := range weights {
		if len(arr) == 1 {
			unbalanced = k
			unbalancedNode = *dic[arr[0]]
		} else {
			common = k
		}

		if common != -1 && unbalanced != -1 {
			break;
		}
	}
	
	//fmt.Println("balancing", unbalancedNode.name, unbalanced, "to", common, "on", unbalancedNode.value, "=", unbalancedNode.value - (unbalanced - common))
	return 0, unbalancedNode.value - (unbalanced - common)
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

	_, balancedSum := sumChildren(dic, root.name)

	fmt.Println("balanced sum", balancedSum)

	return "end"
}

func main() {
	data, _ := ioutil.ReadFile("input.txt")
	raw := string(data)
	fmt.Println(solve(strings.Split(raw, "\n")))
}