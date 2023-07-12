import { API_BASE_URL } from "../constants";

export async function getStudents() {
    const response = await fetch(`${API_BASE_URL}/students`);
    const data = await response.json();
    return data;
}

export async function createStudent(student) {
    const response = await fetch(`${API_BASE_URL}/create`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student),
    });

    if (response.status === 400) {
        const error = await response.json();
        throw error;
    } else {
        const data = await response.json();
        return data;
    }
}

export async function getStudentDetails(rollNo) {
    const response = await fetch(`${API_BASE_URL}/create/students/${rollNo}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    if (response.status === 400) {
        const error = await response.json();
        throw error;
    } else {
        const data = await response.json();
        return data;
    }
}

export async function deleteStudent(rollNo) {
    const response = await fetch(`${API_BASE_URL}/students/${rollNo}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    if (response.status === 400) {
        const error = await response.json();
        throw error;
    } else {
        const data = await response.json();
        return data;
    }
}

export async function editStudent(rollNo, student) {
    try {
        const response = await fetch(`${API_BASE_URL}/students/edit/${rollNo}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        });

        if (!response.ok) {
            throw new Error("Error");
        }
    }
    catch (error) {
        console.log("error", error);
    }
}