/** <title> of a work detail page. Experiences add the role ("Harness — Senior Frontend Engineer"); a project's name is already descriptive. */
export function detailTitle({ name, role }: { name: string; role?: string }): string {
	return role ? `${name} — ${role} · Juan Ignacio Werkalec` : `${name} · Juan Ignacio Werkalec`;
}
