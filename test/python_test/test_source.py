import unittest

try:
    from .source import A
except ImportError:
    from source import A


class TestA(unittest.TestCase):
    def test_mya(self):
        a = A()
        self.assertEqual(a.my_a(), 1)
