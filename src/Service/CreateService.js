export async function getStudents() {
    const response = await fetch("http://localhost:4000/students");
    const data = await response.json();
    return data;
}

export async function createStudents(student) {
    const response = await fetch("http://localhost:4000/students", {
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