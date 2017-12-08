package main

import (
	"fmt"
	"strings"
	"strconv"
	"io/ioutil"
)

func parseCondition(registers map[string]int, rawCondition string) (string, string, int) {
	conditionParts := strings.Split(rawCondition, " ")
	val, _ := strconv.Atoi(conditionParts[2]);
	return strings.TrimSpace(conditionParts[0]), strings.TrimSpace(conditionParts[1]), val
}

func parseInstruction(instruction string) (string, string, int) {
	instructionParts := strings.Split(instruction, " ")
	val, _ := strconv.Atoi(instructionParts[2])
	return strings.TrimSpace(instructionParts[0]), strings.TrimSpace(instructionParts[1]), val
}

func passesCondition(registers map[string]int, rawCondition string) bool {
	checkRegister, operation, compareValue := parseCondition(registers, rawCondition)

	var value int = 0
	if val, ok := registers[checkRegister]; ok {
		value = val
	} else {
		registers[checkRegister] = 0
	}
	
	if operation == ">" { return value > compareValue }
	if operation == ">=" { return value >= compareValue }
	if operation == "<" { return value < compareValue }
	if operation == "<=" { return value <= compareValue }
	if operation == "==" { return value == compareValue }
	if operation == "!=" { return value != compareValue }
	fmt.Println("unexpected operation", operation)
	return false
}

func processCondition(registers map[string]int, instruction string) int {
	register, operation, diff := parseInstruction(instruction)
	if _, ok := registers[register]; !ok {
		registers[register] = 0
	}
	
	if operation == "inc" {
		registers[register] += diff
	} else {
		registers[register] -= diff
	}

	return registers[register]
}

func solve(raw []string) string {
	registers := make(map[string]int)
	max := 0
	for _,instruction := range raw {
		instructionParts := strings.Split(instruction, " if ")
		if passesCondition(registers, instructionParts[1]) {
			current := processCondition(registers, instructionParts[0])

			if max < current {
				max = current
			}
		}
		for k,v := range registers {
			fmt.Println(k, "->", v)
		}
	}

	fmt.Println(registers, "MAX", max)

	return " "
}

func main() {
	data, _ := ioutil.ReadFile("input.txt")
	raw := string(data)
	fmt.Println(solve(strings.Split(raw, "\n")))
}
