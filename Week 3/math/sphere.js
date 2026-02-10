class Sphere {
    constructor(center, radius) {
        if (!(center instanceof Vector3)) {
            console.warn("Invalid center provided. Setting to default zero vector.");
            this.center = new Vector3(0, 0, 0);
        } else {
            this.center = center.clone();
        }

        if (typeof radius !== "number" || isNaN(radius) || radius <= 0) {
            console.warn("Invalid radius provided. Setting to default value of 1.");
            this.radius = 1;
        } else {
            this.radius = radius;
        }
    }

    raycast(ray) {

        var co= ray.origin.clone().subtract(this.center);
        var b = 2 * ray.direction.dot(co);
        var c = co.dot(co) - Math.pow(this.radius,2);

        var discriminant = Math.pow(b,2) - 4 * c;
        if (discriminant < 0) {
            return { hit: false };
        }

        var discriminantroot = Math.sqrt(discriminant);
        var enter = (-b - discriminantroot) / 2;
        var exit = (-b + discriminantroot) / 2;
        var hitdistance = null;

        if (enter > 0 && exit > 0) {
            hitdistance = Math.min(enter, exit);
        } else if (enter > 0) {
            hitdistance = enter;
        } else if (exit > 0) {
            hitdistance = exit;
        } else {
            return { hit: false };
        }

        if (co.length() < this.radius) {
            return { hit: false };
        }

        var point = ray.origin.clone().add(ray.direction.clone().multiplyScalar(hitdistance));
        var normal = point.clone().subtract(this.center).normalize();

        return {
            hit: true,
            point: point,
            normal: normal,
            distance: hitdistance
        };
    }
}
